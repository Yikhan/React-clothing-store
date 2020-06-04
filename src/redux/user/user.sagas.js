import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, createUserProfileDocument, googleProvider } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess } from './user.actions';

import UserActionTypes from './user.types';

export function* getSnapshotFromUserAuth(user) {
  try {
    const userRef = yield call(createUserProfileDocument, user);
		const userSnapshot = yield userRef.get();
		//* 保存得到的User数据
		yield put(
			signInSuccess({
				id: userSnapshot.id,
				...userSnapshot.data()
			})
		);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);		
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSaga() {
	yield all([ call(onGoogleSignInStart), call(onEmailSignInStart) ]);
}
