export const authorTransformer = (author) => {

    return {
        id: author.id,
        name: author.name,
        email: author.email,
        username: author.username,
        profileImage: author.profileImage,
        handle: '@' + author.username,

    }

}