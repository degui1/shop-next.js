import { styled } from '..'

export const MenuContainer = styled('div', {
  backgroundColor: '$gray800',
  maxWidth: 480,
  width: '100%',
  minHeight: '100vh',

  position: 'absolute',
  right: '0',
  zIndex: 1,

  transition: 'all 0.2s ease-in-out',

  display: 'flex',
  flexDirection: 'column',
  padding: '3rem',

  h1: {
    color: '$gray100',
    fontSize: '$lg',
  },

  gap: '2rem',

  variants: {
    variant: {
      opened: {
        transform: 'translateX(0%)',
        opacity: 1,
        zIndex: 1,
      },
      closed: {
        transform: 'translateX(110%)',
        opacity: 0,
        zIndex: -1,
      },
    },
  },
})

export const CloseContainer = styled('div', {
  position: 'absolute',
  right: 5,
  top: 5,
  display: 'flex',
  flexDirection: 'row-reverse',

  button: {
    cursor: 'pointer',
    background: 'transparent',
    border: 0,
    padding: '0.75rem',
  },
})

export const CartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const CartItem = styled('div', {
  display: 'flex',
  gap: '1rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',

    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },

  h2: {
    fontWeight: 'normal',
    color: '$gray300',
    fontSize: '$md',
  },

  p: {
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$gray100',
  },

  span: {
    fontSize: '$sm',
    background: 'transparent',
    border: 0,
    color: '$green300',
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 100,
  height: 100,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const TotalContainer = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',

  gap: '3rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  button: {
    fontSize: '$md',
    height: 69,
    border: 0,
    borderRadius: 8,
    backgroundColor: '$green500',
    color: '$white',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '$green300',
    },
  },
})

export const Resume = styled('p', {
  display: 'flex',
  justifyContent: 'space-between',
  color: '$gray100',

  variants: {
    variant: {
      amount: {},
      total: {
        fontWeight: 'bold',

        span: {
          fontSize: '$xl',
        },
      },
    },
  },
})
