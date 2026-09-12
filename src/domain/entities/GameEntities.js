export class AgentEntity {
  constructor({ id, codename, role, bio, description, avatarUrl, abilities, abilityDetails, isFeatured = false }) {
    this.id = id;
    this.codename = codename;
    this.role = role;
    this.bio = bio;
    this.description = description;
    this.avatarUrl = avatarUrl;
    this.abilities = abilities;
    this.abilityDetails = abilityDetails;
    this.isFeatured = isFeatured;
  }
}

export class WeaponEntity {
  constructor({
    id,
    name,
    category,
    cost,
    imageUrl,
    killfeedIcon,
    wallPenetration,
    fireMode,
    fireRate,
    runSpeed,
    equipSpeed,
    reloadSpeed,
    magazineSize,
    reserveAmmo,
    damageTiers = [],
    altFireFunction,
    altFireZoom,
    isFeatured = false
  }) {
    this.id = id;
    this.name = name;
    this.category = category || 'Rifle';
    this.cost = cost || 0;
    this.imageUrl = imageUrl || '';
    this.killfeedIcon = killfeedIcon || '';
    this.wallPenetration = wallPenetration || 'Medium';
    this.fireMode = fireMode || 'Auto';
    this.fireRate = fireRate || 0;
    this.runSpeed = runSpeed || '5.4 m/sec';
    this.equipSpeed = equipSpeed || '1.0 sec';
    this.reloadSpeed = reloadSpeed || '2.5 sec';
    this.magazineSize = magazineSize || 25;
    this.reserveAmmo = reserveAmmo || '50 (2 magazines)';
    this.damageTiers = Array.isArray(damageTiers) ? damageTiers : [];
    this.altFireFunction = altFireFunction || 'None';
    this.altFireZoom = altFireZoom || 'None';
    this.isFeatured = isFeatured;
  }
}

export class MapEntity {
  constructor({ id, name, location, coordinates, description, tacticalFeatures, callouts, imageUrl, isFeatured = false, gallery = [] }) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.coordinates = coordinates;
    this.description = description;
    this.tacticalFeatures = tacticalFeatures;
    this.callouts = callouts;
    this.imageUrl = imageUrl;
    this.isFeatured = isFeatured;
    this.gallery = gallery && gallery.length > 0 ? gallery : (imageUrl ? [imageUrl] : []);
  }
}
