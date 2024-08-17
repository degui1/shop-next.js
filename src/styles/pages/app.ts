import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',

  overflow: 'hidden',
  position: 'relative',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
})

export const CartButton = styled('button', {
  backgroundColor: '$gray800',
  border: 0,
  cursor: 'pointer',
  width: '3rem',
  height: '3rem',
  borderRadius: 8,
  borderTopRightRadius: 'calc(26px * -1)',
  padding: '0.75rem',

  span: {
    position: 'absolute',
    color: '$white',
  },

  variants: {
    variant: {
      filled: {
        color: '$gray800',
      },
    },
  },
})
