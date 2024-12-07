// /pages/api/auth/error.js
export default function ErrorPage({ query }) {
    return (
        <div>
            <h1>Error: {query.error}</h1>
        </div>
    );
}
