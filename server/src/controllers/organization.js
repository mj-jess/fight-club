import { Organization } from '../models/index.js';

// GET /api/organizations
export async function list(req, res) {
  try {
    const organizations = await Organization.find().sort({ created_at: -1 });
    return res.json(organizations);
  } catch (error) {
    console.error('Error listing organizations:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// POST /api/organizations
export async function create(req, res) {
  try {
    const { name, category, notes } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const existing = await Organization.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: 'Organization with this name already exists' });
    }

    const organization = await Organization.create({
      name: name.trim(),
      category,
      notes,
    });

    return res.status(201).json(organization);
  } catch (error) {
    console.error('Error creating organization:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
