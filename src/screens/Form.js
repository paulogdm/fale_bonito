import React, { useState, useEffect } from 'react'
import { Form, Input, Row, Col, message, Button, Alert } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { wordsRef } from '../services/firestoneServices'
import get from 'lodash.get'


const FormAdd = props => {
	const [word, setWord] = useState()
	const [description, setDescription] = useState()
	const [id, setID] = useState()
	const [isSubmitting, setSubmitting] = useState(false)

	useEffect(() => {
		getFormData()
	}, [])

	const getFormData = async () => {
		const { id } = get(props, 'location.state', '')
		if (!id) return

		const form = await wordsRef.doc(id).get()
		if (!form.exists) return

		const { word, description } = form.data()

		setWord(word)
		setDescription(description)
		setID(id)
	}

	const submit = async e => {
		e.preventDefault()
		if (!isValid()) return
		setSubmitting(true)
		try {
			id
				? await wordsRef.doc(id).set({ word, description })
				: await wordsRef.add({ word, description })
			message.success('Palavra salva!')
			props.history.push('/list')
		} catch (error) {
			message.error(error)
		}

		resetForm()
	}

	const resetForm = () => {
		setDescription()
		setWord()
		setSubmitting(false)
	}

	const isValid = () => {
		if (!word || !description)
			return false
		return true
	}

	return (
		<>
			<Row type='flex' justify='center'>
				<Col span={8}>
					<Form layout='vertical' onSubmit={submit}>
						<Form.Item
							label='Palavra'
							required
							hasFeedback={word !== undefined}
							validateStatus={validate(word)}
						>
							<Input
								placeholder='Exemplo: Vicissitude'
								onChange={e => setWord(e.target.value)}
								value={word}
								autoFocus
							/>
						</Form.Item>
						<Form.Item
							label='Descrição'
							validateStatus={validate(description)}
							hasFeedback={description !== undefined}
							required
						>
							<TextArea
								placeholder='Exemplo: Sequência de mudanças ou transformações'
								onChange={e => setDescription(e.target.value)}
								value={description}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								disabled={!word || !description}
								block
								icon='check'
								loading={isSubmitting}
							>
								Cadastrar!
          		</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
			<Row type='flex' justify='center' style={{ marginTop: 60 }}>
				<Col span={14}>
					<HelperMessage />
				</Col>
			</Row>
		</>
	)
}

const HelperMessage = () => (
	<Alert
		message='Opa!'
		description={
			<span>Se está sem criatividade,
					<a href='https://www.normaculta.com.br/palavras-dificeis/' target='_tab'>dá uma olhada aqui</a>
			</span>
		}
		type='warning'
		showIcon
	/>

)

export default FormAdd
const validate = string => string !== undefined ? string.length ? 'success' : 'error' : ''

