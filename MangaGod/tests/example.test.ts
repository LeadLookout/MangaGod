import { render, screen } from '@testing-library/react';
import { HomePage } from '../src/pages';
import { MangaList } from '../src/components';

describe('HomePage', () => {
    test('renders the homepage with manga list', () => {
        render(<HomePage />);
        const heading = screen.getByText(/manga list/i);
        expect(heading).toBeInTheDocument();
    });
});

describe('MangaList', () => {
    test('displays a list of manga titles', () => {
        const mangaTitles = ['Naruto', 'One Piece', 'Attack on Titan'];
        render(<MangaList titles={mangaTitles} />);
        mangaTitles.forEach(title => {
            const titleElement = screen.getByText(title);
            expect(titleElement).toBeInTheDocument();
        });
    });
});