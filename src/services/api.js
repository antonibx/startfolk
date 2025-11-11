const API_BASE = 'http://localhost:4000';

export class ApiService {
  static async searchCharacters(query) {
    const res = await fetch(`${API_BASE}/api/characters${query ? '?search=' + encodeURIComponent(query) : ''}`);
    if (!res.ok) throw new Error('API search error');
    return res.json();
  }

  static async getFeaturedCharacters() {
    const res = await fetch(`${API_BASE}/api/characters/featured`);
    if (!res.ok) throw new Error('API featured error');
    return res.json();
  }

  static async getCharacter(id) {
    const res = await fetch(`${API_BASE}/api/characters/${id}`);
    if (!res.ok) throw new Error('Character not found');
    return res.json();
  }
}
