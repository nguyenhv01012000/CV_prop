const puppeteer = require('puppeteer');

const catchAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
};

exports.printResume = catchAsync(async (req, res) =>{
    const userId = req.query.userId;
    const auth = req.query.auth;
    const type = req.query.type;
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    const url = `http://localhost:8000/app/preview?userId=${userId}&auth=${auth}`;
    //await page.goto(`${url}`, {waitUntil: 'networkidle0'});
    await page.goto(`${url}`, {waitUntil: 'load'});
    await page.emulateMediaType('print');
    let pdf;

    if (type === 'single') {
        const height = await page.evaluate(() => {
            const { body } = document;
            const html = document.documentElement;

            const maxHeight = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight,
            );

            return maxHeight;
        });
        pdf = await page.pdf({
            printBackground: true,
            width: `21cm`,
            height: `${height}px`,
            pageRanges: '1',
        });
    } else {
        pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
        });
    }

    await browser.close();
    return res.status(200).json({
        'data': Buffer.from(pdf).toString('base64')
    })
})
