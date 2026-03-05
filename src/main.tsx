import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { DesignSwitcher } from './components/DesignSwitcher'

// ── Design Variants ──
// Use ?design=v2 (or v3, v4) in the URL to switch between designs
// Default (no param) = v1 (original)
const App = lazy(() => import('./App.tsx'))
const DesignV2 = lazy(() => import('./designs/v2/DesignV2.tsx'))
const DesignV3 = lazy(() => import('./designs/v3/DesignV3.tsx'))
const DesignV4 = lazy(() => import('./designs/v4/DesignV4.tsx'))
const DesignV5 = lazy(() => import('./designs/v5/DesignV5.tsx'))
const DesignV6 = lazy(() => import('./designs/v6/DesignV6.tsx'))
const DesignV7 = lazy(() => import('./designs/v7/DesignV7.tsx'))
const DesignV8 = lazy(() => import('./designs/v8/DesignV8.tsx'))
const DesignV9 = lazy(() => import('./designs/v9/DesignV9.tsx'))

function getDesignParam(): string {
  const params = new URLSearchParams(window.location.search)
  return params.get('design') || 'v1'
}

function DesignRouter() {
  const design = getDesignParam()

  const renderDesign = () => {
    switch (design) {
      case 'v2':
        return <DesignV2 />
      case 'v3':
        return <DesignV3 />
      case 'v4':
        return <DesignV4 />
      case 'v5':
        return <DesignV5 />
      case 'v6':
        return <DesignV6 />
      case 'v7':
        return <DesignV7 />
      case 'v8':
        return <DesignV8 />
      case 'v9':
        return <DesignV9 />
      default:
        return <App />
    }
  }

  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        background: '#1a1714',
        color: '#F0E8D8',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '0.875rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}>
        Caffe Bacco
      </div>
    }>
      {renderDesign()}
      <DesignSwitcher />
    </Suspense>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignRouter />
  </StrictMode>,
)
