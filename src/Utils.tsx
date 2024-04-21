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
  latitude?: number
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
