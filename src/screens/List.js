import React, { useState, useEffect } from 'react'
import { List, Card, Icon, Popconfirm, message } from 'antd'
import { StyleSheet, css } from 'aphrodite'
import { wordsRef } from '../services/firestoneServices'

const ListItems = props => {
	const [list, setList] = useState([])

	useEffect(() => {
		const unsubscribe = getData()
		return () => {
			unsubscribe()
		}
	}, [])

	const getData = () => {
		const unsubscribe = wordsRef.onSnapshot(words => {
			const list = []
			words.forEach(docs => list.push({ id: docs.id, ...docs.data() }))
			setList(list)
		})

		return unsubscribe
	}

	const remove = async id => {
		if (!id) return

		await wordsRef.doc(id).delete()
		message.success('Palavra removida com sucesso')

		const newList = list.filter(x => x.id !== id)
		setList(newList)
	}

	const update = async id => {
		if (!id) return
		props.history.push('/add', { id })
	}


	return (
		<List
			grid={{ column: 4, gutter: 16 }}
			dataSource={list}
			renderItem={item => (
				<List.Item>
					<Card
						title={item.word}
						className={css(styles.card)}
						actions={[
							<Icon
								type='edit'
								key='edit'
								onClick={() => update(item.id)}
							/>,
							<Popconfirm
								key='delete'
								title='Confirma deletar?'
								onConfirm={() => remove(item.id)}
								okText='Sim'
								cancelText='Não'
								placement='bottom'
							>
								<Icon type='delete' />
							</Popconfirm>

						]}
					>
						{item.description}
					</Card>
				</List.Item>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	card: {
		width: 200,
		textAlign: 'center'
	}
})

export default ListItems

