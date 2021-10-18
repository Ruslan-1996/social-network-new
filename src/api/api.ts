import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '3588cd03-a8ff-4f0d-9d81-9d9c39c14fdb'
  }
})

export const usersAPI = {
  getUsers(pageSize: number, pageNumber: number) {
    return instance.get(`users?count=${pageSize}&page=${pageNumber}`)
  },
  follow(userId: number) {
    return instance.post('follow/' + userId, {})
  },
  unfollow(userId: number) {
    return instance.delete('follow/' + userId)
  },
  getStatus(userId: number) {
    return instance.get('profile/status/' + userId)
  },
  updateStatus(status: string) {
    return instance.put('profile/status', {
      status: status
    })
  }
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get('profile/' + userId)
  },
  changeUserPhoto(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  }
}

export type userLoginDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export const authAPI = {
  userLogin(userLoginData: userLoginDataType) {
    return instance.post('auth/login', {...userLoginData})
  },
  userLogOut() {
    return instance.delete('auth/login')
  },
  getAuthUser() {
    return instance.get('auth/me').then(response => response.data)
  },
  getCaptcha() {
    return instance.get('security/get-captcha-url').then(response => response.data)
  }
}