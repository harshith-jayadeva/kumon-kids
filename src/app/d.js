const profiles = {
    Alice: { bio: "Loves art and tech." },
    Bob: { bio: "Movie enthusiast." },
    Charlie: { bio: "Nature lover." },
    Diana: { bio: "Designer and creative thinker." },
    Ethan: { bio: "Health and wellness advocate." },
    Fiona: { bio: "Aspiring novelist." },
    George: { bio: "Tech and media geek." },
    Hannah: { bio: "Storytelling expert." },
    Ian: { bio: "Outdoor adventurer." },
};

function getProfileDetails(name) {
    return profiles[name] || { bio: "No bio available." };
}