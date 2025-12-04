import "./Community.css";

export default function Community() {
  const donors = [
    { name: "Rahul Verma", img: "/donors/d1.jpg", role: "Blood Donor" },
    { name: "Pooja Sharma", img: "/donors/d2.jpg", role: "Plasma Donor" },
    { name: "Ankit Singh", img: "/donors/d3.jpg", role: "Regular Donor" },
  ];

  const receivers = [
    { name: "Vikas Rao", img: "/receivers/r1.jpg", role: "Recovered" },
    { name: "Sneha Patil", img: "/receivers/r2.jpg", role: "Recovered" },
  ];

  return (
    <main className="community-section">
      <h1 className="community-title">Kartavya Community</h1>

      {/* Donors Section */}
      <h3 className="community-subtitle">❤️ Our Proud Donors</h3>
      <div className="community-grid">
        {donors.map((d, i) => (
          <div className="community-card" key={i}>
            <img src={d.img} alt={d.name} />
            <p className="community-name">{d.name}</p>
            <p className="community-role">{d.role}</p>
          </div>
        ))}
      </div>

      {/* Receivers Section */}
      <h3 className="community-subtitle" style={{ marginTop: "50px" }}>
        🩸 Lives Saved
      </h3>
      <div className="community-grid">
        {receivers.map((r, i) => (
          <div className="community-card" key={i}>
            <img src={r.img} alt={r.name} />
            <p className="community-name">{r.name}</p>
            <p className="community-role">{r.role}</p>
          </div>
        ))}
      </div>
    </main>
  );
}