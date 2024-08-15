export const isAdmin = (user) => user && user.role === 'admin'
export const getUserId = (user) => user && user._id
export const getUsername = (user) => user && user.username
