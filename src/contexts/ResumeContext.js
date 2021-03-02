import arrayMove from "array-move"
import { v4 as uuidv4 } from "uuid"
import { clone, findIndex, get, isUndefined, merge, setWith, set, has } from "lodash"
import React, { createContext, memo, useCallback, useContext, useReducer } from "react"
import { dataSynchronization } from '../utils';
import i18next from "i18next"

import demoState from "../data/demoState.json"
import initialState from '../data/initState.json'

const ResumeContext = createContext()

const ResumeProvider = ({ children }) => {

	const memoizedReducer = useCallback(
		(state, { type, payload }) => {
			let newState
			let index
			let items, item
			let temp
			switch (type) {
				case 'on_add_sectionsLeft':
					items = clone(get(state, 'sectionsLeft', []));
					index = findIndex(items, { id: 'about' });
					if (index >= 0) items.splice(index, 1);
					index = findIndex(items, { id: payload.path });
					if (index < 0 && payload.path != 'about') newState = setWith(clone(state), 'sectionsLeft', [...items, { id: payload.path }, { id: 'about' }], clone);
					else newState = setWith(clone(state), 'sectionsLeft', [...items, { id: 'about' }], clone);
					return newState;

				case 'on_delete_sectionsLeft':
					items = clone(get(state, 'sectionsLeft', []));
					index = findIndex(items, { id: payload.path });
					items.splice(index, 1);
					newState = setWith(clone(state), 'sectionsLeft', [...items], clone);
					return newState;

				case 'on_add_sectionsRight':
					items = clone(get(state, 'sectionsRight', []));
					index = findIndex(items, { id: 'about' });
					if (index >= 0) items.splice(index, 1);
					index = findIndex(items, { id: payload.path });
					if (index < 0 && payload.path != 'about') newState = setWith(clone(state), 'sectionsRight', [...items, { id: payload.path }, { id: 'about' }], clone);
					else newState = setWith(clone(state), 'sectionsRight', [...items, { id: 'about' }], clone);
					return newState;

				case 'on_delete_sectionsRight':
					items = clone(get(state, 'sectionsRight', []));
					index = findIndex(items, { id: payload.path });
					items.splice(index, 1);
					newState = setWith(clone(state), 'sectionsRight', [...items], clone);
					return newState;

				case 'on_display_section':
					items = get(state, payload.path);
					newState = setWith(clone(state), `${payload.path}`, !items, clone);
					return newState;

				case 'on_display_item':
					items = clone(get(state, payload.path));
					index = findIndex(items, ['id', payload.value.id]);
					payload.value.visible = !payload.visible;
					newState = setWith(clone(state), `${payload.path}[${index}]`, payload.value, clone);
					return newState;

				case 'on_add_item':
					delete payload.value.temp;
					items = get(state, payload.path, []);
					payload.value.visible = true;
					newState = setWith(clone(state), payload.path, [...items, payload.value], clone);
					return newState;

				case 'on_edit_item':
					delete payload.value.temp;
					items = get(state, payload.path);
					index = findIndex(items, ['id', payload.value.id]);
					newState = setWith(clone(state), `${payload.path}[${index}]`, payload.value, clone);
					return newState;

				case 'on_delete_item':
					items = clone(get(state, payload.path));
					index = findIndex(items, ['id', payload.value.id]);
					items.splice(index, 1);
					newState = setWith(clone(state), payload.path, items, clone);
					return newState;

				case 'on_move_item_up':
					items = get(state, payload.path);
					index = findIndex(items, ['id', payload.value.id]);
					items = arrayMove(items, index, index - 1);
					newState = setWith(clone(state), payload.path, items, clone);
					return newState;

				case 'on_move_item_down':
					items = get(state, payload.path);
					index = findIndex(items, ['id', payload.value.id]);
					items = arrayMove(items, index, index + 1);
					newState = setWith(clone(state), payload.path, items, clone);
					return newState;

				case 'change_language':
					newState = set(clone(state), 'metadata.language', payload);
					items = get(i18next.getDataByLanguage(payload), 'translation.builder.sections');
					const sectionList = state.metadata.sections;
					Object.keys(items).forEach((key) => {
						has(newState, `${key}.heading`) && set(newState, `${key}.heading`, items[key]);
						if (sectionList.includes(key)) localStorage.setItem(key, items[key]);
					});
					return newState;

				case 'reset_layout':
					temp = get(state, 'metadata.template');
					items = get(initialState, `metadata.layout.${temp}`);
					newState = setWith(clone(state), `metadata.layout.${temp}`, items, clone);
					return newState;

				case "on_input":
					newState = setWith(clone(state), payload.path, payload.value, clone)
					return newState

				case 'on_import':
					temp = clone(state);
					newState = payload;
					newState.id = temp.id;
					newState.user = temp.user;
					newState.name = temp.name;
					newState.createdAt = temp.createdAt;
					newState.updatedAt = temp.updatedAt;
					return newState;

				case 'set_data':
					newState = payload;
					return newState;

				case 'reset_data':
					temp = clone(state);
					newState = initialState;
					newState.id = temp.id;
					newState.user = temp.user;
					newState.name = temp.name;
					newState.preview = temp.preview;
					newState.createdAt = temp.createdAt;
					newState.updatedAt = temp.updatedAt;
					return newState;

				case "load_demo_data":
					const demoState1 = dataSynchronization(demoState, demoState.metadata.sections);
					newState = merge(clone(state), demoState1)
					newState.metadata.layout = demoState.metadata.layout
					return newState
				default:
					throw new Error()
			}
		}
	)

	const [state, dispatch] = useReducer(memoizedReducer)

	return (
		<ResumeContext.Provider value={{ state, dispatch }}>
			{children}
		</ResumeContext.Provider>
	)
}


const useSelector = (path, fallback) => {
	const { state } = useContext(ResumeContext)
	let value = get(state, path)
	if (isUndefined(value)) {
		value = isUndefined(fallback) ? state : fallback
	}
	return value
}

const useDispatch = () => {
	const { dispatch } = useContext(ResumeContext)
	return dispatch
}

const memoizedProvider = memo(ResumeProvider)


export {
	ResumeContext,
	memoizedProvider as ResumeProvider,
	useSelector,
	useDispatch
}