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
				<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
					<Menu.Item key='1'>
						<Icon type='form' />
						Cadastro
					</Menu.Item>
					<Menu.Item key='2'>
						<Link to='/list'>
							<Icon type='bars' />
							Listagem
						</Link>
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
