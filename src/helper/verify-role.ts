import { UserRoles } from './../model/user';
import { decode } from 'jsonwebtoken';

export const VerifyRoles = (manager: boolean, clerk: boolean, guest: boolean, req: any) => {
    const token = req.get('authorization')?.split(' ')[1]

    if (!token) {
        return "Invalid Token"
    }
    const jwt = decode(token, { json: true })
    let managerRole = UserRoles.Invalid;
    let clerkRole = UserRoles.Invalid;
    let guestRole = UserRoles.Invalid;
    if (manager) {
        managerRole = UserRoles.Manager
    }
    if (clerk) {
        clerkRole = UserRoles.Clerk
    }
    if (guest) {
        guestRole = UserRoles.Guest
    }

    if (jwt?.role === managerRole || jwt?.role === clerkRole || jwt?.role === guestRole) {
        return true;
    } else {
        return false;
    }
}

