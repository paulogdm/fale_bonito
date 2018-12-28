import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { StyleSheet, css } from 'aphrodite'
const { Header, Sider, Content } = Layout

const Container = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false)
	return (
		<Layout className={css(styles.main)}>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
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
					<Icon
						className='trigger'
						type={collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={() => setCollapsed(!collapsed)}
					/>
				</Header>
				<Content className={css(styles.content)}>
					{children}
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
		background: '#fff',
		padding: 0
	}
})

export default Container
