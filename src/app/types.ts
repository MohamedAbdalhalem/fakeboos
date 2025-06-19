export type postType = {
    body: string,
    id: string,
    image: string,
    user: userType
    comments: commentType[],
    createdAt: string
}
export type userType = {
    name: string,
    photo: string,
    _id:string
}
export type commentType = {
    content: string,
    commentCreator: userType
    _id: string
}

export type userDataType = {
    name: string,
    email: string,
    gender: string,
    dateOfBirth: string,
    photo: string,
    _id: string
}