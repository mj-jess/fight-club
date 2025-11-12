import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Organization } from '../models/index.js';

const { isValidObjectId } = mongoose;

// GET /api/organizations
export async function list(req: Request, res: Response) {
  try {
    const organizations = await Organization.find().sort({ created_at: -1 });
    return res.json(organizations);
  } catch (error) {
    console.error('Error listing organizations:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// POST /api/organizations
export async function create(req: Request, res: Response) {
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

// GET /api/organizations/:id
export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid organization ID' });
    }

    const organization = await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    return res.json(organization);
  } catch (error) {
    console.error('Error getting organization: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// PUT /api/organizations/:id
export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, category, notes } = req.body as {
      name?: string;
      notes?: string;
      category?: string;
    };

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid organization ID' });
    }

    if (name && !name.trim()) {
      return res.status(400).json({ message: 'Name cannot be empty' });
    }

    const organization = await Organization.findById(id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (name && name.trim() !== organization.name) {
      const duplicated = await Organization.findOne({ name: name.trim() });
      if (duplicated) {
        return res.status(400).json({ message: 'Organization with this name already exists' });
      }
      organization.name = name.trim();
    }

    if (category) {
      organization.category = category as any;
    }

    if (typeof notes === 'string') {
      organization.notes = notes;
    }

    await organization.save();
    return res.json(organization);
  } catch (error) {
    console.error('Error updating organization:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// DELETE /api/organizations/:id
export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid organization ID' });
    }

    const organization = await Organization.findByIdAndDelete(id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting organization:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
