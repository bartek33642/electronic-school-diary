import { jwtDecode } from 'jwt-decode';

export function isLoggedIn(expectedRole) {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    return userRole === expectedRole;
}
