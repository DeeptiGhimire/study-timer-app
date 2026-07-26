export const registerUser = async (form) => {
  try {
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}; 