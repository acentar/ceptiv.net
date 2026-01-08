// Simple test component to verify React is working
export default function AdminLoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f4',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        padding: '24px'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            Admin Login Page
          </h1>
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            If you can see this, React is working!
          </p>
        </div>

        <div style={{
          backgroundColor: '#dbeafe',
          border: '1px solid #bfdbfe',
          borderRadius: '6px',
          padding: '12px',
          marginBottom: '16px'
        }}>
          <p style={{
            color: '#1e40af',
            fontSize: '14px',
            margin: 0
          }}>
            ✅ Page is loading successfully!
          </p>
        </div>

        <button
          style={{
            width: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer'
          }}
          onClick={() => alert('Button clicked! React events work too!')}
        >
          Test Button
        </button>
      </div>
    </div>
  )
}