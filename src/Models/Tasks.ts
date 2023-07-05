import { Model, DataTypes } from "sequelize";
import sequelize from "./database";

class Task extends Model {
    public id!: number;
    public task!: string;
    public done!: boolean;
}

Task.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      task: {
        type: new DataTypes.STRING(45),
        allowNull: false,
      },
      done: {
        type: new DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    },
    {
      tableName: "tasks",
      sequelize,
    }
);
  
export default Task;