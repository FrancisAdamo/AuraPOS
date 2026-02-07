import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HelpPage from '../components/HelpPage';

describe('HelpPage.tsx', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      text: async () => 'Linea con **negrita** y HTML literal <strong>no</strong>\n',
    })) as unknown as typeof fetch);
  });

  it('debe renderizar negrita como <strong> sin inyectar HTML', async () => {
    render(
      <MemoryRouter initialEntries={['/help']}>
        <Routes>
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('negrita')).toBeInTheDocument();
    expect(screen.getByText('negrita').tagName.toLowerCase()).toBe('strong');

    expect(screen.getByText((content) => content.includes('<strong>no</strong>'))).toBeInTheDocument();
  });

  it("'Volver' debe navegar hacia atrás", async () => {
    render(
      <MemoryRouter initialEntries={['/pos', '/help']}>
        <Routes>
          <Route path="/help" element={<HelpPage />} />
          <Route path="/pos" element={<div>POS PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/Centro de Ayuda/i);

    const backButton = screen.getByRole('button', { name: /Volver/i });
    fireEvent.click(backButton);

    expect(await screen.findByText('POS PAGE')).toBeInTheDocument();
  });
});
