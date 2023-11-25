import { useAuth } from '../components/AuthContext'; 

function Favorites() {
  const { favorites } = useAuth();

  return (
    <div className="container mx-auto lg:px-20 mt-4">
      <h1 className="text-3xl font-semibold mb-4">Your Favorite Listings</h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {favorites.map((favoriteId) => (
          <div key={favoriteId} className="favorite-item">
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;