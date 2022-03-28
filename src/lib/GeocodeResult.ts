// Model is representation of data found here https://opencagedata.com/api#forward-resp

export interface Position {
  coords: {
    accuracy: number;
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

export interface GeocodeResultModel {
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
  results: GeocodeResultInstance[];
  timestamp: {
    created_http: string; // "Mon, 20 Jan 2020 13:15:22 GMT"
    created_unix: number; // 1579526122
  };
}

interface GeocodeResultInstance {
  confidence: number; // not really a measure of accuraccy https://opencagedata.com/api#confidence
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
}

export class GeocodeResultEntity {
  position: Position;

  static DefaultModel = (): GeocodeResultModel => {
    return {
      rate: {
        limit: 10000,
        remaining: 9999,
        reset: 1234,
      },
      timestamp: {
        created_http: "Mon, 20 Jan 2020 13:15:22 GMT",
        created_unix: 1579526122,
      },
      results: [
        {
          confidence: 10,
          formatted: "The Space Needle",
          geometry: {
            lat: 47.6205131,
            lng: -122.3493036,
          },
        },
      ],
    };
  };

  constructor(model: GeocodeResultModel) {
    if (model.results.length === 0) {
      throw new Error("[GeocodeResult no results found]");
    }
    const bestResult = model.results[0]; //results are ranked best->worst match
    this.position = {
      coords: {
        accuracy: bestResult.confidence,
        latitude: bestResult.geometry.lat,
        longitude: bestResult.geometry.lng,
      },
      timestamp: model.timestamp.created_unix,
    };
  }
}
