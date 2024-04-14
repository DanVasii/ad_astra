
const cardSection = document.querySelector('.card-section');
        const nextBtn = document.querySelector('.next-btn');

        // Add event listener to the next button
        nextBtn.addEventListener('click', () => {
            // Calculate the number of cards to move
            const cardsToMove = 3;

            // Get the current position of the first card
            const currentPosition = cardSection.scrollLeft;

            // Calculate the new position
            const newPosition = currentPosition + cardSection.clientWidth;

            // Smoothly scroll to the new position
            cardSection.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
        });