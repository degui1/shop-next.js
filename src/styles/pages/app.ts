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

export const ButtonContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 12,
  borderRadius: 6,
  cursor: 'pointer',
  width: '56px',
  height: '56px',
  background: '$gray800',
})

export const CartButton = styled('button', {
  backgroundColor: 'transparent',
  border: 0,
  cursor: 'pointer',
})

export const ProductCounter = styled('div', {
  position: 'absolute',
  top: '-7px',
  right: '-7px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '24px',
  height: '24px',
  background: '$green500',
  borderRadius: '50%',
  border: '3px solid $gray900',
  color: '$white',
  fontSize: '0.75rem',
  fontWeight: 'bold',
})
