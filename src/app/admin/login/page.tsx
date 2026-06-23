export default function AdminLoginPage() {
    return (
        <form action="/admin" method="POST">
            <input type="text" name="key" placeholder="Enter admin key..."></input>
            <button type="submit">Login</button>
        </form>
    )
}