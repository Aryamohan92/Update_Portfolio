const { useState } = React;

function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
        alert("Thank you for your message!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="mb-3">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label>Message:</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

// Render the component
ReactDOM.createRoot(document.getElementById("contact-form")).render(<ContactForm />);
