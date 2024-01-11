// A composable that provides a set of function to manage the Authentification process 
import { jwtDecode } from "jwt-decode";
export default () => {
    //create a function that returns an object of a state variable and its value (initially empty)
    const useAuthToken = () => useState("auth_token");
    const useAuthUser = () => useState("auth_user");
    const useAuthLoading = () => useState("auth_loading", () => true)

    // access the state variable (auth_token) through useAuthToken() and assign newToken to its value
    const setToken = (newToken) => {
        const authToken = useAuthToken();
        authToken.value = newToken;
    };

    // access the state variable (auth_token) through useAuthToken() and assign newToken to its value
    const setUser = (newUser) => {
        const authUser = useAuthUser();
        authUser.value = newUser;
    };

    const setIsAuthloading = (value) => {
        const auth_loading = useAuthLoading();
        auth_loading.value = value;
    };

    //This login will be called from the app.vue and will post on the api endpoint auth/login.post.js to get user credential and access_token
    const login = ({ username, password }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await $fetch("/api/auth/login", {
                    method: "POST",
                    body: {
                        username,
                        password,
                    },
                });
                setToken(data.access_Token);
                setUser(data.user)
                console.log(data);
                resolve(true)
            } catch (error) {
                reject(error)
            }
        });
    };


    //when refreshing the page we generate a new AccessToken based on the refreshtoken stored in Cookies
    const refreshToken = () => {

        return new Promise(async(resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/refresh')

                setToken(data.access_token)
                resolve(true)

            } catch (error) {
                reject(error)
            }
        })
    }


    //get user credentials by accessing the event.context.auth
    const getUser = () => {

        return new Promise(async(resolve, reject) => {
            try {

                const data = await useFetchApi('/api/auth/user')
                setUser(data.user)
                resolve(true)

            } catch (error) {
                reject(error)
            }
        })
    }

    const reRefreshAccessToken = () => {

        const authToken = useAuthToken()
        if (!authToken.value) {
            return
        }
        const jwt = jwtDecode(authToken.value)

        const newRefreshTime = jwt.exp - 60000

        setTimeout(async() => {
            await refreshToken()
            reRefreshAccessToken()

        }, newRefreshTime)

    }

    const initAuth = () => {

        return new Promise(async(resolve, reject) => {
            setIsAuthloading(true)
            try {
                await refreshToken()
                await getUser()

                reRefreshAccessToken()
                resolve(true)

            } catch (error) {
                reject(error)

            } finally {
                setIsAuthloading(false)
            }
        })
    }

    const logout = () => {
        return new Promise(async(resolve, reject) => {
            try {

                await useFetchApi('/api/auth/logout', {
                    method: 'POST'
                })
                setToken(null)
                setUser(null)
                resolve()

            } catch (error) {
                reject(error)

            }
        })
    }

    return {
        useAuthUser,
        login,
        initAuth,
        useAuthToken,
        useAuthLoading,
        logout

    };
};