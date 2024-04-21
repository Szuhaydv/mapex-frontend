interface LoadingInterface {
  value: {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

interface LandmarkInterface {
  title: string,
  icon?: string,
  longitude?: number,
  latitude?: number,
  id?: number
}

interface MarkerOptionsInterface {
  scale: string,
  offset?: number[],
  color?: string
}

interface MapInterface {
  _id: string,
  title: string,
  author: string,
  coverImage?: string,
  tags?: string[],
  publicStatus: boolean,
  numberOfLikes?: number,
  landmarks: LandmarkInterface[],
  markerColor: string,
  subscription: string,
}

interface MyMapsProps {
  value: {
    username: string;
    isLoggedIn: boolean;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

interface LoginProps {
  value: {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
  }
}