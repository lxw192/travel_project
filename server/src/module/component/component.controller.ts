import { Utils } from './../../utils/index';
import { ComponentPropEntity } from './../component-prop/component-prop.entity';
import { ComponentPropService } from './../component-prop/component-prop.service';
import { Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { ComponentEntity } from './component.entity';
import { ComponentDto } from './component.dto';
import { ComponentService } from './component.service';
import { success, Http } from '../../common/Http';
import { ReqData } from '../../decorator/req-data.decorator';
import { reqDataValid } from '../../utils/reqDataValid';
import { ComponentPropControlService } from '../component-prop-control/component-prop-control.service';
import { ComponentPropControlDataService } from '../component-prop-control-data/component-prop-control-data.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('component')
export class ComponentController extends BaseController<
  ComponentEntity,
  ComponentDto
> {
  constructor(
    protected readonly service: ComponentService,
    protected readonly componentPropService: ComponentPropService,
    protected readonly componentPropControlService: ComponentPropControlService,
    protected readonly componentPropControlDataService: ComponentPropControlDataService,
  ) {
    super();
  }

  @Get('/list')
  @success()
  async list(@ReqData() reqData) {
    const { type, cate } = reqData;

    console.log(33333333333333333);
    const list = await this.service.list({cate});
    // list.forEach((item) => {
    //   item.propData = [];
    // });

    console.log(
      '🚀 ~ file: component.controller.ts ~ line 52 ~ list ~ list',
      list,
    );

    return list;
  }

  @Get('name/:name')
  @success()
  async byType(@Param('name') name, @ReqData() reqData) {
    // console.log("🚀 ~ file: component.controller.ts ~ line 47 ~ byType ~ name33333333333", name)
    const entity = await this.service.repository.findOne({ name });
    entity.propData = [];

    const firstLevelPropData = await this.componentPropService.repository.find({
      componentId: entity.id,
      parentId: null,
    });

    for (const item of firstLevelPropData) {
      const data = await this.componentPropService.repository.manager
        .getTreeRepository(ComponentPropEntity)
        .findDescendantsTree(item);

      await Utils.treeForOf([data], async (item) => {
        const controls = await this.componentPropControlService.repository.find(
          { componentProp: item },
        );
        for (const control of controls) {
          const controlData = await this.componentPropControlDataService.repository.find(
            // { control: control.id },
            { control },
          );
          control.propData = controlData;
        }
        item.controls = controls;
      });
      entity.propData.push(data);
    }

    return entity;
  }
  @Get(':id')
  @success()
  async get(@Param('id') id, @ReqData() reqData) {
    const entity = await this.service.repository.findOne(id);
    entity.propData = [];

    const firstLevelPropData = await this.componentPropService.repository.find({
      componentId: entity.id,
      parentId: null,
    });

    for (const item of firstLevelPropData) {
      const data = await this.componentPropService.repository.manager
        .getTreeRepository(ComponentPropEntity)
        .findDescendantsTree(item);

      await Utils.treeForOf([data], async (item) => {
        const controls = await this.componentPropControlService.repository.find(
          { componentProp: item },
        );
        for (const control of controls) {
          const controlData = await this.componentPropControlDataService.repository.find(
            // { control: control.id },
            { control },
          );
          control.propData = controlData;
        }
        item.controls = controls;
      });
      entity.propData.push(data);
    }

    return entity;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @success()
  async create(@Request() req) {
    const reqData = Http.getReqDataByData(req);
    const { type, cate, name, label, developerName, propData } = reqData;
    const componentEntityData = this.service.repository.create({
      type,
      cate,
      name,
      label,
      developerName,
      // propData,
    });

    const componentEntity = await this.service.repository.save(
      componentEntityData,
    );

    Utils.treeForEach(propData, (item) => {
      item.componentId = componentEntity.id;
    });

    const componentPropEntityData = this.componentPropService.repository.create(
      propData,
    );
    await this.componentPropService.repository.save(componentPropEntityData);

    await Utils.treeForOf(
      componentPropEntityData,
      async (componentPropEntity: ComponentPropEntity) => {
        for (const control of componentPropEntity.controls) {
          const controlEntityData = this.componentPropControlService.repository.create(
            control,
          );
          controlEntityData.componentProp = componentPropEntity;
          controlEntityData.componentId = componentEntity.id;
          const controlEntity = await this.componentPropControlService.repository.save(
            controlEntityData,
          );

          for (const propDataItem of control.propData) {
            const propDataItemEntityData = this.componentPropControlDataService.repository.create(
              propDataItem,
            );
            propDataItemEntityData.control = controlEntity;
            propDataItemEntityData.componentId = componentEntity.id;
            const propDataItemEntity = await this.componentPropControlDataService.repository.save(
              propDataItemEntityData,
            );
          }
        }
      },
    );

    return {
      id: componentEntity.id,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @success()
  async update(@Param('id') id, @Request() req) {
    const reqData = Http.getReqDataByData(req);
    const { type, cate, name, label, developerName, propData } = reqData;
    const componentEntity = this.service.repository.create({
      id,
      type,
      cate,
      name,
      label,
      developerName,
      // propData: propDataEntity,
    });

    await this.componentPropControlDataService.repository.delete({
      componentId: id,
    });
    await this.componentPropControlService.repository.delete({
      componentId: id,
    });
    await this.componentPropService.repository.delete({
      componentId: id,
    });
    await this.service.repository.update(id, componentEntity);

    Utils.treeForEach(propData, (item) => {
      item.componentId = componentEntity.id;
    });

    const componentPropEntityData = this.componentPropService.repository.create(
      propData,
    );
    await this.componentPropService.repository.save(componentPropEntityData);

    await Utils.treeForOf(
      componentPropEntityData,
      async (componentPropEntity: ComponentPropEntity) => {
        for (const control of componentPropEntity.controls) {
          const controlEntityData = this.componentPropControlService.repository.create(
            control,
          );
          controlEntityData.componentProp = componentPropEntity;
          controlEntityData.componentId = componentEntity.id;
          const controlEntity = await this.componentPropControlService.repository.save(
            controlEntityData,
          );

          for (const propDataItem of control.propData) {
            const propDataItemEntityData = this.componentPropControlDataService.repository.create(
              propDataItem,
            );
            propDataItemEntityData.control = controlEntity;
            propDataItemEntityData.componentId = componentEntity.id;
            const propDataItemEntity = await this.componentPropControlDataService.repository.save(
              propDataItemEntityData,
            );
          }
        }
      },
    );

    return {
      id: id,
    };
  }
}
