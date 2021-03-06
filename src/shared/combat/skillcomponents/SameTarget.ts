import { PartialCombatSkill, ICombatCharacter, ICombat, ICombatSkillCombinator } from '../../interfaces';

export const SameTarget = (...combinatorContainers: Array<ICombatSkillCombinator[]>) =>
  (skill: PartialCombatSkill, caster: ICombatCharacter, combat: ICombat): PartialCombatSkill => {

    if(!skill.targets || skill.targets.length === 0) {
      throw new Error(`Skill ${JSON.stringify(skill)} is trying to SameTarget but has no targets. Combat: ${JSON.stringify(combat)}`);
    }

    combinatorContainers.forEach(combinatorSkill => {

      const baseCombineSkill: PartialCombatSkill = { targets: skill.targets.filter(x => !isNaN(x)) };

      const newSkill = combinatorSkill.reduce((prev, cur) => {
        return cur(prev, caster, combat);
      }, baseCombineSkill);

      newSkill.targets.forEach(target => {
        if(isNaN(target)) return;

        newSkill.targetEffects[target].forEach(eff => {
          skill.targetEffects = skill.targetEffects || {};
          skill.targetEffects[target] = skill.targetEffects[target] || [];
          skill.targetEffects[target].push(eff);
        });
      });
    });

    return skill;
  };
