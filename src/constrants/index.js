export const API_User_Login = 'http://localhost:3001/api/auth/sign-in';
export const API_User_Ragister = 'http://localhost:3001/api/auth/sign-up';
export const createModule = async (data) => {
    try {
      const response = await fetch(API_User_Ragister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }

      // Handle successful registration
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error during registration:", error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };
