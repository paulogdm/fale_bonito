import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Input } from 'antd'
import { StyleSheet, css } from 'aphrodite'
import { wordsRef } from './services/firestoneServices'

const { Header, Sider, Content } = Layout

const Container = props => {

	const search = async value => {
		const x = await wordsRef
			.orderBy('word')
			.startAt(value)
			.endAt(`${value}\uf8ff`)
			.get()
		x.forEach(z => {
			console.log(z.data())
		})
	}

	const [collapsed, setCollapsed] = useState(false)
	return (
		<Layout className={css(styles.main)}>
			<Sider
				collapsed={collapsed}
				collapsible
				trigger={null}
			>
				<Menu theme='dark' mode='inline'>
					<Menu.Item key='Cadastro'>
						<Item
							text='Cadastro'
							to='/add'
							icon='form'
						/>
					</Menu.Item>
					<Menu.Item key='Listagem'>
						<Item
							text='Listagem'
							to='/list'
							icon='bars'
						/>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header className={css(styles.header)}>
					<div className={css(styles.headerText)}>
						<Icon
							className='trigger'
							type={collapsed ? 'right-circle' : 'left-circle'}
							onClick={() => setCollapsed(!collapsed)}
							theme='filled'
						/>
						<span onClick={() => setCollapsed(!collapsed)}>
							{collapsed ? 'Expandir Menu' : 'Retrair Menu'}
						</span>
					</div>
					<div className={css(styles.search)}>
						<Input onChange={e => search(e.target.value)} />
					</div>
				</Header>
				<Content className={css(styles.content)}>
					{props.children}
				</Content>
			</Layout>
		</Layout>
	)
}


const Item = ({ to, icon, text }) => (
	<Link to={to}>
		<Icon type={icon} />
		<span>{text}</span>
	</Link>
)

const styles = StyleSheet.create({
	main: {
		height: '100vh'
	},
	content: {
		margin: '24px 16px',
		padding: 24,
		background: '#fff',
		minHeight: 280
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		background: '#fff',
		fontSize: 18,
		padding: '15px 16px 0 10px'
	},
	headerText: {
		margin: '-15px 0 0 0',
		cursor: 'pointer'
	},
	search: {
		width: '50vw'
	}
})

export default Container
