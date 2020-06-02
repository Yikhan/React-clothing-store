import { call, put, takeEvery } from 'redux-saga/effects';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';

import { ShopActionTypes } from './shop.types';

export function* fetchCollectionsAsync() {
	yield console.log('Saga fired! Fetch collections!');

	try {
		const collectionRef = firestore.collection('collections');
		const snapshot = yield collectionRef.get();
		//* 使用call来让Saga控制函数调用，方便取消
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    //* 使用put来发送action给reducer，相当于dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}

export function* fetchCollectionsStart() {
	yield takeEvery(ShopActionTypes.FETCH_COLLECTION_START, fetchCollectionsAsync);
}
