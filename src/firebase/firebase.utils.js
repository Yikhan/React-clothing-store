import 'firebase/firestore';
import 'firebase/auth';

import { Promise } from 'q';
import firebase from 'firebase/app';

const config = {
	apiKey: 'AIzaSyAwleexWMVvIg7ytCBdehHJESQV-vyicCk',
	authDomain: 'crown-shop-907ed.firebaseapp.com',
	databaseURL: 'https://crown-shop-907ed.firebaseio.com',
	projectId: 'crown-shop-907ed',
	storageBucket: 'crown-shop-907ed.appspot.com',
	messagingSenderId: '1069948568116',
	appId: '1:1069948568116:web:a67635af33c389922e0061',
	measurementId: 'G-TMGHHPPZQZ'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	//* snapShot is like the data set returned with informational properties
	const snapShot = await userRef.get();
	//* create new user if not exits
	if (!snapShot.exists) {
		//* 从firebase返回的user里有一个displayName属性，但这个与我们注册时自定义的displayName不是一个东西
		//* 我们可以把它覆盖掉（把注册的displayName放在additionlData里面）
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.error('Error when create user', error);
		}
	}

	return userRef;
};

export const addCollectionAndItems = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach((object) => {
		// * 生成一个新的id
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, object);
	});

	return await batch.commit();
};

// * 把firebase里面的collection数据转换为一个完整的对象
export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});

	// * 把数组转换为对象，因为对象的查找速度明显优于数组
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

//* 为了在Saga里面取到User，这里模拟了一般情况下获得User的过程，仍然需要使用onAuthStateChange
export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};

//* 如果需要返回的ref对象，就使用provider，在外面再调用auth.signInWithPopup
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

//* 可以直接使用google注册
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;
