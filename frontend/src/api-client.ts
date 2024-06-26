import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/models/hotel";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        // To enable http-cookies and send them to backend while calling APIs
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json()

    if(!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    })

    if(!response.ok) {
        throw new Error("Unauthorized!")
    }

    return response.json()
}

export const signInUser = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json()

    if(!response.ok) {
        throw new Error(responseBody.message)
    }

    return responseBody
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })

    if(!response.ok) {
        throw new Error("Error during log out")
    }
}

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData
    })

    if(!response.ok) {
        throw new Error("Failed to add hotel")
    }

    return response.json();
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Error fetching hotels")
    }

    return response.json();
 }

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Error fetching hotels")
    }

    return response.json();
}