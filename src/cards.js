const toursData = [
  {
    id: 1,
    title: 'Ciudad Perdida',
    description: 'Una aventura épica por la sierra nevada hasta descubrir las antiguas ruinas indígenas.',
    image: 'https://picsum.photos/seed/ciudadperdida/400/300'
  },
  {
    id: 2,
    title: 'Parque Tayrona',
    description: 'Explora las playas más hermosas de Colombia rodeadas de selva tropical y montañas nevadas.',
    image: 'https://picsum.photos/seed/tayrona/400/300'
  },
  {
    id: 3,
    title: 'Minca',
    description: 'Refúgiate en las montañas, disfruta de cascadas cristalinas y el mejor café orgánico.',
    image: 'https://picsum.photos/seed/minca/400/300'
  },
  {
    id: 4,
    title: 'Taganga',
    description: 'Un pintoresco pueblo de pescadores famoso por sus atardeceres y el buceo en sus aguas tranquilas.',
    image: 'https://picsum.photos/seed/taganga/400/300'
  },
  {
    id: 5,
    title: 'Acuario / Inca Inca',
    description: 'Conoce la vida marina de cerca y relájate en la hermosa y exclusiva playa de Inca Inca.',
    image: 'https://picsum.photos/seed/acuario/400/300'
  },
  {
    id: 6,
    title: 'Playa Blanca Canopy',
    description: 'Siente la adrenalina volando sobre el mar Caribe y disfruta de las arenas blancas y aguas cristalinas.',
    image: 'https://picsum.photos/seed/playablanca/400/300'
  },
  {
    id: 7,
    title: 'Palomino',
    description: 'Donde el río se encuentra con el mar. Disfruta del tubing y de un ambiente relajado inigualable.',
    image: 'https://picsum.photos/seed/palomino/400/300'
  },
  {
    id: 8,
    title: 'Cabo de la Vela',
    description: 'Donde el desierto se encuentra con el mar Caribe. Una experiencia cultural única con la comunidad Wayúu.',
    image: 'https://picsum.photos/seed/cabodelavela/400/300'
  },
  {
    id: 9,
    title: 'Punta Gallinas',
    description: 'El punto más septentrional de Sudamérica. Dunas inmensas que caen directamente al mar.',
    image: 'https://picsum.photos/seed/puntagallinas/400/300'
  },
  {
    id: 10,
    title: 'Cartagena Histórica',
    description: 'Camina por las calles empedradas de la Ciudad Amurallada y descubre su magia colonial.',
    image: 'https://picsum.photos/seed/cartagena/400/300'
  },
  {
    id: 11,
    title: 'Islas del Rosario',
    description: 'Un archipiélago paradisíaco con arrecifes de coral perfectos para hacer snorkel y relajarse.',
    image: 'https://picsum.photos/seed/islasrosario/400/300'
  },
  {
    id: 12,
    title: 'Tour del Café',
    description: 'Aprende todo sobre el proceso del café colombiano desde la semilla hasta la taza en la Sierra Nevada.',
    image: 'https://picsum.photos/seed/tourcafe/400/300'
  }
];

export function initCards() {
  const container = document.getElementById('cards-container');
  if (!container) return;

  // Render cards
  container.innerHTML = toursData.map(tour => `
    <div class="card fade-in" data-id="${tour.id}">
      <div class="card-content">
        <img src="${tour.image}" alt="${tour.title}" loading="lazy" style="width: 100%; border-radius: 10px; margin-bottom: 1rem; object-fit: cover; height: 200px;" />
        <h3>${tour.title}</h3>
        <p>${tour.description}</p>
      </div>
    </div>
  `).join('');

  // Add 3D interaction logic
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    // Desktop hover effect
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return; // Skip on mobile
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 768) return;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    // Mobile click effect
    card.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      
      // Simple flip or scale effect on mobile
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 150);
    });
  });
}
