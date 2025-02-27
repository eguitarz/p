document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation 
    const menuItems = document.querySelectorAll('.top-menu li');
    const contentSections = document.querySelectorAll('.content-section');
    const submenu = document.getElementById('submenu');
    
    // Define submenu items for each main menu
    const submenus = {
        profile: [],
        experience: [],
        projects: [
            { id: 'oura', label: 'OURA DASHBOARD' },
            { id: 'ember-trix', label: 'EMBER TRIX' },
            { id: 'tab-management', label: 'TAB MANAGEMENT APP' }
        ],
        contact: [
            { id: 'linkedin', label: 'LINKEDIN' },
            { id: 'github', label: 'GITHUB' }
        ]
    };
    
    // Handle main menu clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Update active menu item
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content section
            const sectionId = this.getAttribute('data-section');
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
            
            // Update submenu
            updateSubmenu(sectionId);
            
        });
    });
    
    // Function to update submenu based on selected main menu
    function updateSubmenu(sectionId) {
        // Clear current submenu
        submenu.innerHTML = '';
        
        // Add new submenu items
        if (submenus[sectionId] && submenus[sectionId].length > 0) {
            submenus[sectionId].forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.label;
                li.setAttribute('data-item', item.id);
                li.addEventListener('click', function() {
                    // Update active submenu item
                    const submenuItems = document.querySelectorAll('#submenu li');
                    submenuItems.forEach(si => si.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show corresponding content
                    handleSubmenuClick(sectionId, item.id);
                    
                });
                submenu.appendChild(li);
            });
        }
    }
    
    // Function to handle submenu item clicks
    function handleSubmenuClick(sectionId, itemId) {
        if (sectionId === 'projects') {
            const projectContents = document.querySelectorAll('.project-content');
            projectContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === itemId) {
                    content.classList.add('active');
                }
            });
        } else if (sectionId === 'contact') {
            const contactContents = document.querySelectorAll('.contact-content');
            contactContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === itemId) {
                    content.classList.add('active');
                }
            });
        }
    }
    
    // Handle dialogue options in profile section
    const dialogueOptions = document.querySelectorAll('.option');
    dialogueOptions.forEach(option => {
        option.addEventListener('click', function() {
            const optionId = this.getAttribute('data-option');
            const response = document.getElementById(`${optionId}-response`);
            
            // Mark this question as answered
            answeredQuestions[optionId] = true;
            
            // Hide this option
            this.style.display = 'none';
            
            // Check if all questions have been answered
            if (checkAllQuestionsAnswered()) {
                revealProfile();
            }
            
            // Toggle response visibility
            const isActive = response.classList.contains('active');
            
            // Hide all responses first
            document.querySelectorAll('.response').forEach(resp => {
                resp.classList.remove('active');
            });
            
            // Show this response if it wasn't already active
            if (!isActive) {
                response.classList.add('active');
            }
            
            // Terminal typing effect
            if (!isActive) {
                simulateTyping(response);
                
                // Re-run command processor to make commands clickable
                setTimeout(processResponseTexts, 500);
            }
        });
    });
    
    // Function to update the time
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        document.getElementById('current-time').textContent = timeString;
    }
    
    // Function to simulate terminal typing effect
    function simulateTyping(element) {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.display = 'block';
        
        let i = 0;
        const speed = 5; // typing speed
        
        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        typeWriter();
    }
    
    // Initialize with profile section active
    updateSubmenu('profile');
    
    // Track answered questions for profile revelation
    const answeredQuestions = {
        'who': false,
        'mission': false,
        'values': false
    };
    
    // Function to check if all questions have been answered
    function checkAllQuestionsAnswered() {
        return Object.values(answeredQuestions).every(value => value === true);
    }
    
    // Function to reveal profile image
    function revealProfile() {
        const imageContainer = document.querySelector('.image-container');
        imageContainer.classList.add('revealed');
        
        // Show formal introduction
        document.getElementById('formal-introduction').classList.add('active');
    }
    
    // Handle clickable links
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('clickable-link')) {
            const url = e.target.getAttribute('data-url');
            
            if (url.startsWith('#')) {
                // For internal navigation
                const sectionId = url.substring(1);
                document.querySelector(`.top-menu li[data-section="${sectionId}"]`)?.click();
            } else if (url) {
                // For external links
                window.open(url, '_blank');
            }
        }
    });
    
    // Handle commands in dialogue text
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('command')) {
            const action = e.target.getAttribute('data-action');
            const target = e.target.getAttribute('data-target');
            
            if (action === 'navigate' && target) {
                // Find the target menu item and click it
                const menuItem = document.querySelector(`.top-menu li[data-section="${target}"]`);
                if (menuItem) {
                    menuItem.click();
                    console.log(`Navigating to ${target}`);
                } else {
                    console.log(`Could not find menu item for ${target}`);
                }
            }
        }
    });
    
    // Initialize and update the clock
    updateTime();
    setInterval(updateTime, 1000);
    
    // Show access denied message for the tab-repo-link
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-repo-link')) {
            // Create and display an access denied message
            const deniedMessage = document.createElement('div');
            deniedMessage.className = 'access-denied';
            deniedMessage.textContent = '[ACCESS DENIED] The guest doesn\'t have enough permission.';
            
            // Position near the clicked element
            const rect = e.target.getBoundingClientRect();
            deniedMessage.style.position = 'absolute';
            deniedMessage.style.top = `${rect.bottom + window.scrollY + 10}px`;
            deniedMessage.style.left = `${rect.left + window.scrollX}px`;
            deniedMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            deniedMessage.style.color = '#ff3333';
            deniedMessage.style.padding = '10px';
            deniedMessage.style.borderRadius = '5px';
            deniedMessage.style.zIndex = '1000';
            deniedMessage.style.fontFamily = 'var(--font-mono)';
            
            // Add to document
            document.body.appendChild(deniedMessage);
            
            // Remove after a delay
            setTimeout(() => {
                if (deniedMessage.parentNode) {
                    deniedMessage.parentNode.removeChild(deniedMessage);
                }
            }, 3000);
            
            // Stop any other event handling
            e.stopPropagation();
            return false;
        }
    });
    
    // Easter egg - Konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Create a hidden message that appears
        const easterEgg = document.createElement('div');
        easterEgg.className = 'easter-egg';
        easterEgg.innerHTML = '<p>War. War never changes.</p>';
        easterEgg.style.position = 'fixed';
        easterEgg.style.top = '50%';
        easterEgg.style.left = '50%';
        easterEgg.style.transform = 'translate(-50%, -50%)';
        easterEgg.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
        easterEgg.style.color = 'var(--pip-green-light)';
        easterEgg.style.padding = '20px';
        easterEgg.style.border = '2px solid var(--pip-green)';
        easterEgg.style.zIndex = '1000';
        easterEgg.style.animation = 'fadeIn 0.5s';
        
        document.body.appendChild(easterEgg);
        
        // Remove after a few seconds
        setTimeout(() => {
            easterEgg.style.animation = 'fadeOut 0.5s';
            setTimeout(() => {
                document.body.removeChild(easterEgg);
            }, 500);
        }, 3000);
    }
    
    // Add fadeOut animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
