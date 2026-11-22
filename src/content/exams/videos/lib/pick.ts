import type { El, Explainer } from '@/video/script.ts';

/**
 * An element of a lesson's explainer video, found by its id, so an exam video can show the same
 * animation the lesson uses (the element is copied as it is, with its parts and clips). A second
 * id renames it, so two picks can share a scene. Throws if the lesson has no element with that id.
 */
export function pick(video: Explainer, id: string, as?: string): El {
  for (const scene of video.scenes)
    for (const el of [...(scene.main ?? []), ...(scene.left ?? []), ...(scene.right ?? [])])
      if (el.id === id) return { ...el, id: as ?? id } as El;
  throw new Error(`pick: ${video.id} has no element "${id}"`);
}
