import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoService {
    // constructor(@InjectModel(GlobalStats.name) private globalStatsModel: Model<GlobalStatsDocument>) {}
    // async getGlobalStatsDoc(periodName = 'all'): Promise<GlobalStatsDocument> {
    // 	let doc = await this.globalStatsModel.findOne({ period: periodName });
    // 	if (!doc && periodName === 'all') {
    // 		const newDoc: GlobalStats = {
    // 			period: 'all',
    // 			countDynamicVoices: 0,
    // 			countDynamicTime: 0,
    // 		};
    // 		doc = await this.globalStatsModel.create(newDoc);
    // 	}
    // 	return doc;
    // }
}
