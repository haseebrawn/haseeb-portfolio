const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f9ff] px-4">
      <div className="card-soft w-full max-w-md p-8">
        <h1 className="text-3xl font-black text-dark">Admin Login</h1>
        <p className="mt-2 text-muted">Login to manage portfolio content.</p>

        <form className="mt-8 space-y-4">
          <input
            className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
            placeholder="Email"
            type="email"
          />
          <input
            className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
            placeholder="Password"
            type="password"
          />
          <button className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-dark">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login