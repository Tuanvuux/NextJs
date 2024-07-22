export default async function handler(req, res) {
    const { name } = req.query;
    try {
      const response = await fetch(`https://localhost:7124/api/Customer/name/${name}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching customer data', error: error.message });
    }
  }
  