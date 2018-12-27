import React, { useState, useEffect } from 'react'
import { List, Card } from 'antd'
import firebase from '../firebase'

const ListItems = () => {
	const [list, setList] = useState([])

	useEffect(() => {
		getData()
	}, [])

	const getData = () => {
		const list = []
		firebase.firestore().collection('words').onSnapshot(words => {
			words.forEach(docs => list.push({ id: docs.id, ...docs.data() }))
			setList(list)
		})
	}

	return (
		<List
			grid={{ column: 6, gutter: 16 }}
			dataSource={list}
			renderItem={item => (
				<List.Item>
					<Card title={item.word}>
						{item.description}
					</Card>
				</List.Item>
			)}
		/>
	)
}

export default ListItems

