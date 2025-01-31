import mongoose from "mongoose";

export interface IStatus {
  createdAt: Date,
  updatedAt: Date | null,
  deletedAt: Date | null,
}

export class CommonFields {
  _id?: mongoose.Types.ObjectId;
  status?: IStatus;

  constructor(commonFields: ICommonFields) {
    this._id = commonFields._id;
    this.status = commonFields.status;
  }
}

export interface ICommonFields {
  _id?: mongoose.Types.ObjectId;
  status?: IStatus;
}
