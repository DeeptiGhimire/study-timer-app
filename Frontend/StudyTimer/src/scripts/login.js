export const loginUser = async (form) => {
  try {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}; 