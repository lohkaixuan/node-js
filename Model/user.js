class User {
    constructor({ id, name, email, password, date_joined, gender, phone, role }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.date_joined = date_joined;
        this.gender = gender;
        this.role = role;
        this.phone = phone;

    }
  
    
    getInfo() {
      return `
      User Info:
    - ID: ${this.id}
    - Name: ${this.name}
    - Email: ${this.email}
    - Joined: ${this.date_joined.toISOString()}
    - Gender: ${this.gender}
    - Role: ${this.role}
    - Phone: ${this.phone}
    `;
    }

  // Return only public data (e.g. to send to client)
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      date_joined: this.date_joined,
      gender: this.gender,
      role: this.role,
      phone: this.phone,
    };
  }
}
  
  module.exports = User;